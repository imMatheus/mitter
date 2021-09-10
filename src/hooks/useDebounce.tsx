import { useEffect } from 'react'
import useTimeout from './useTimeout'

export default function useDebounce(callback: any, delay: number, dependency: any[]) {
    const { clear, reset } = useTimeout(callback, delay)
    useEffect(reset, [...dependency, reset])
    useEffect(clear, [])
}
