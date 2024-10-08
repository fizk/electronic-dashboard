type Maybe<T> = T | null | undefined

export interface ResistorValue {
    id: string | number
    text: string
    value: number
    active: boolean
    notes: Maybe<string>
}

export interface CapacitorValue {
    id: string | number,
    nano: number
    nano_value: string
    pico: number
    pico_value: string
    micro: number
    micro_value: string
    farad: number
    farad_value: string
    active: boolean
    notes: string
}
export interface WantListEntry {
    id: string | number,
    name: string
    description?: Maybe<string>
    done: boolean
    date: number
}

declare global {   
    namespace JSX {     
        interface IntrinsicElements {       
            math: any;       
            mi: any;       
            mo: any;     
            mn: any;     
            msup: any;     
            msub: any;     
            mrow: any;     
            mfrac: any;     
            mstyle: any;     
            mfenced: any;     
        }   
    } 
}
