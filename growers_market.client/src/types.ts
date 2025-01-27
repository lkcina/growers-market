export interface SpeciesInfo {
    id: number;
    commonName: string;
    scientificName: string[];
    cycle: string;
    watering: string;
    sunlight: string[];
    hardinessMin: number;
    hardinessMax: number;
    indoor: boolean;
    description: string;
    image: string;
    thumbnail: string;
}

export interface Listing {
    id: number;
    title: string;
    isForTrade: boolean;
    price: number;
    quantity: number;
    species: SpeciesInfo;
    description: string;
    appUsername: string;
    images: string[];
}

export interface Chat {
    id: number;
    listing: Listing;
    appUsername: string;
    messages: Message[];
}

export interface Message {
    chatId: number;
    appUsername: string;
    content: string;
    timeStamp: Date;
}