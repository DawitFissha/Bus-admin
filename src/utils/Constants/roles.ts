export interface ROLE {
    id:string
    description:string

}
export const roles:ROLE[] = [
    {
        id:'admin',
        description:'Admin'
    },
    {
        id:'casher',
        description:'Cashier'
    },
    {
        id:'driver',
        description:'Driver'
    },
    {
        id:'redat',
        description:'Redat'
    },
    {
        id:'firstadmin',
        description:'Super Admin'
    },
    {
        id:'agent',
        description:'Agent'
    }
]
