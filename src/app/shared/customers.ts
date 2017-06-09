export interface CustomerInterface {
    name: any;
    id: any;
}

export class Customer implements CustomerInterface{
    name: any = '';
    id: any = 0;
}
