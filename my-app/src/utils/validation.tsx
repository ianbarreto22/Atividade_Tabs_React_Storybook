import { TabProps } from "../components/Tab"

export function maxLength(max: number){
    return(value: string) => {
        const v = value.trim()
        if(v.length > max){
            return `Este campo deve ter no máximo ${max} caracteres`
        }
        return null
    }
}

export function isInt(value: string){
    if(value && isNaN(parseInt(value, 10))){
        return 'Este campo deve ser um número inteiro'
    }
    return null
}

export function required(value: string){
    if(value === undefined || value.trim().length === 0){
        return `Este campo é obrigatório`
    }
    return null
}

export function inRange(min: number, max: number){
    return (value: string) => {
        const num = parseInt(value,10)
        const [vmin, vmax] = min > max ? [max, min] : [min, max]
        if(value && (isNaN(num) || num < vmin || num > vmax)){
            return `Este campo deve ser um número entre ${vmin} e ${vmax}`
        }
        return null
    }
}