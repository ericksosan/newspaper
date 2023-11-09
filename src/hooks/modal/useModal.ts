import { useEffect, useState } from 'react'

interface UseModal {
  isModalOpen: boolean
  handlerToggleModal: (status: boolean) => void
}

export const useModal = (initialStatus: boolean = false): UseModal => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(initialStatus)

  useEffect(() => {
    document.querySelector('body')?.classList.toggle('overflow-hidden', isModalOpen)
  }, [isModalOpen])

  const handlerToggleModal = (status: boolean): void => {
    setIsModalOpen(status)
  }

  return {
    isModalOpen,
    handlerToggleModal
  }
}
