type Maybe<T> = T | null | undefined
export interface ValueItemEntry {
    id: string | number
    text: string
    value: number
    active: boolean
}



export interface WantListEntry {
    id: string | number,
    name: string
    description?: Maybe<string>
    done: boolean
    date: number
}