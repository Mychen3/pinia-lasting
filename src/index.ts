import type {PiniaPluginContext} from 'pinia'

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


const subscribe = (storageKey: string, store: PiniaPluginContext["store"]) => {
    const storage = getStorage(storageKey) ? JSON.parse(getStorage(storageKey) as string) : ''
    store.$subscribe((subscribeObject) => {
        if (storage && storage !== '') {
            const {newValue,key} = subscribeObject.events
            const storeId = subscribeObject.storeId

            if (subscribeObject.events.type !== 'set') return
            if (newValue !== storage[key]) {
                const oid = subscribeObject.events.target
                oid[key] = newValue
                setStorage(storeId, oid)
            }
        }
    })
}

export const piniaLasting = (context: PiniaPluginContext) => {
    const {store, options} = context
    const storeName: string = store.$id

    if (!storeName) throw new Error('No current id')
    const afterMerger = mergeStoreObject(options)
    moveStorage(storeName, store, afterMerger)
    subscribe(storeName, store)
}



