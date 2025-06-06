﻿using AutoMapper;
using growers_market.Server.Dtos.Account;
using growers_market.Server.Dtos.Address;
using growers_market.Server.Helpers;
using growers_market.Server.Interfaces;
using growers_market.Server.Mappers;
using growers_market.Server.Models;
using growers_market.Server.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace growers_market.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IGoogleGeocodingService _googleGeocodingService;
        private readonly IAddressRepository _addressRepository;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IGoogleGeocodingService googleGeocodingService, IAddressRepository addressRepository, IMapper mapper)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _googleGeocodingService = googleGeocodingService;
            _addressRepository = addressRepository;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var addressQuery = new AddressQueryObject
                {
                    StreetAddressLine1 = registerDto.StreetAddressLine1,
                    StreetAddressLine2 = registerDto.StreetAddressLine2 == null ? "" : registerDto.StreetAddressLine2,
                    City = registerDto.City,
                    State = registerDto.State,
                    PostalCode = registerDto.PostalCode
                };

                var userAddress = await _googleGeocodingService.GetUserAddressLocation(addressQuery);
                if (userAddress == null || userAddress.PostalCode != registerDto.PostalCode) {
                    return BadRequest("Invalid Address");
                }

                

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                var createUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        var newUser = await _userManager.FindByNameAsync(appUser.UserName);
                        var createdAddress = await _addressRepository.CreateAddressAsync(newUser, userAddress);
                        if (createdAddress == null)
                        {
                            return StatusCode(500, "Failed to create address");
                        }
                        return Ok(
                            new NewUserDto
                            {
                                UserName = newUser.UserName,
                                Email = newUser.Email,
                                Address = _mapper.Map<AddressDto>(newUser.Address),
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.Users.Include(u => u.Address).FirstOrDefaultAsync(u => u.UserName.ToLower() == loginDto.Username.ToLower());
            
            if (user == null)
            {
                return Unauthorized("Invalid Username");
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Invalid Username and/or Password");
            }

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Address = _mapper.Map<AddressDto>(user.Address),
                    Token = _tokenService.CreateToken(user)
                }
            );
        }
    }
}
