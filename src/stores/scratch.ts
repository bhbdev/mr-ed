import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

// store to keep track of scratch lists of items
export const useScratchList = defineStore('scratchList', () => {
 
    type ScratchList = {
        name: string,
        items: object[]
    }

    const scratchList = ref({} as ScratchList)
    
    function newList(name: string) {
        scratchList.value = { name: name, items: [] }
    }

    function getList() {
        return scratchList.value.items
    }

    function getName() {
        return scratchList.value.name
    }
    
    function addListItem(item: object) {
        scratchList.value.items.push(item)
    }
    
    function removeListItem(index: number) {
        scratchList.value.items.splice(index, 1)
    }
    
    function clearList() {
        scratchList.value.items = []
    }
    
    function $reset() {
        scratchList.value = { name: '', items: [] }
    }
    
    return {
        scratchList,
        getList,
        getName,
        newList,
        addListItem,
        removeListItem,
        clearList,
        $reset
    }
  
}, {
	persist: true
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useScratchList, import.meta.hot))
}
