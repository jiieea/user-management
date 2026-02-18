import { ModalProps} from "@/app/types/interfaces";
import { create } from 'zustand'


export const useEditModal = create<ModalProps>((set) => ({
    isOpen : false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))