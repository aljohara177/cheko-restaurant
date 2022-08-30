export interface Menu {
    images: string[];
    _id: string;
    menuname: string;
    description: string;
    __v: number;
    type: string;
    quantity: number;
}

export interface MenuList {
    Result: Menu[];
}