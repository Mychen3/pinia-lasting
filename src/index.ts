import type {PiniaPluginContext} from 'pinia';
import type {PiniaLasting} from '../types'


const mergeStoreObject = (options: PiniaPluginContext["options"]) => {
    if (!options.state) throw new Error('No current undefined state')
    let storeObject = options.state()
    return {
        ...storeObject
    }
}
const setStorage = (storageKey: string, storageObject) => {
    sessionStorage.setItem(storageKey, JSON.stringify(storageObject))
}
const getStorage = (storageKey: string) => {
    return sessionStorage.getItem(storageKey)

}

const moveStorage = (storageKey: string, store: PiniaPluginContext["store"], storageObject) => {
    const storage = getStorage(storageKey) ? JSON.parse(getStorage(storageKey) as string) : ''
    if (storage && storage !== '') {
        Object.keys(storage).forEach(key => {
            if (store.hasOwnProperty(key)) {
                store[key] = storage[key]
            }
        })
    } else {
        setStorage(storageKey, storageObject)
    }
}


const subscribe = ( store: PiniaPluginContext["store"]) => {
    store.$subscribe((subscribeObject) => {
            const {newValue,oldValue} = subscribeObject.events
            const storeId = subscribeObject.storeId
            if (subscribeObject.events.type !== 'set') return
            if (newValue !== oldValue) {
                const target = subscribeObject.events.effect.fn()
                setStorage(storeId, target)
            }
    })
}

export const piniaLasting:PiniaLasting = (context: PiniaPluginContext):any => {
    const {store, options} = context
    const storeName: string = store.$id

    if (!storeName) throw new Error('No current id')
    const afterMerger = mergeStoreObject(options)
    moveStorage(storeName, store, afterMerger)
    subscribe(store)

}