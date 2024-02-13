export interface IComplexity{
    mode: string
    url: string
}

export const COMPLEXITY_DATA:IComplexity[] =[
    {
        mode: "Easy",
        url: "/easyMode"
    },
    {
        mode: "Normal",
        url: "/normalMode"
    },
    {
        mode: "Difficult",
        url: "/difficultMode"
    },
    {
        mode: "Custom",
        url: "/customMode"
    }
]

