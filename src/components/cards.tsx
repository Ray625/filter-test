import { useState, useEffect } from "react"
import Filter from "./filter"

const Cards = () => {
  const [seletedSection, setSeletedSection] = useState("使用中課程")
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const handleChangeScreen = () => {
      if (window.innerWidth > 768) {
        setIsClosing(false)
      }
    }

    addEventListener('resize', () => handleChangeScreen())

    return removeEventListener('resize', () => handleChangeScreen())
  },[])

  const handleOpenFilte = () => {
    setIsClosing(false)
  }

  return (
    <div className="relative w-9/10 lg:w-fit h-[60vh] lg:max-w-[1140px] py-8 lg:py-4 bg-backgrond-color border border-border-color">
      <div className="absolute top-0 left-0 flex flex-row -translate-y-full border border-list-border rounded-t-sm text-list-text text-base md:text-lg">
        <button
          className={`px-4 py-2 rounded-t-sm ${seletedSection === "使用中課程" ? "bg-selected-color text-white" : "bg-unSelected-color lg:hover:opacity-80"}`}
          onClick={()=> setSeletedSection("使用中課程")}
        >使用中課程</button>
        <button
          className={`px-4 py-2 rounded-t-sm ${seletedSection === "到期課程" ? "bg-selected-color text-white" : "bg-unSelected-color lg:hover:opacity-80"}`}
          onClick={()=> setSeletedSection("到期課程")}
        >到期課程</button>
      </div>
      <button
        className="lg:hidden absolute -top-1 right-0 px-2 py-1 -translate-y-full border border-active-color rounded-sm text-active-color text-base md:text-lg"
        onClick={handleOpenFilte}
      >
        篩選
      </button>
      <Filter
        isClosing={isClosing}
        setIsClosing={setIsClosing}
      />
    </div>
  )
}

export default Cards