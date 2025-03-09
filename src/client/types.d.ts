type Maybe<T> = T | null | undefined

export interface Value {
    id: string | number
    active: boolean
    notes: Maybe<string>
}

export interface ResistorValue extends Value {
    text: string
    value: number
}

export interface CapacitorValue extends Value {
    nano: number
    nano_value: string
    pico: number
    pico_value: string
    micro: number
    micro_value: string
    farad: number
    farad_value: string
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
            mroot: any;     
            munderover: any
        }   
    } 
}
