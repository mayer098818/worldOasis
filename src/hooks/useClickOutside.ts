import { useEffect, useRef } from "react"

// 泛型封装：默认是 HTMLDivElement，需要别的元素时可以传入类型参数
const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
    callback: () => void,
    listenCapturing = true
) => {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener("click", handleClick, listenCapturing)
        return () =>
            document.removeEventListener("click", handleClick, listenCapturing)
    }, [callback, listenCapturing])

    return ref
}
export default useClickOutside