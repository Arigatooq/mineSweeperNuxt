export interface INavbarItem{
    name: string,
    url: string
}

export const NAVBAR_DATA: INavbarItem[] = [
    {
        name: "Main page",
        url: "/"
    },
    {
        name: "Scoreboard",
        url: "/scoreboardChoose"
    }
]
