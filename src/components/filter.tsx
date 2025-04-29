import { useState } from "react"

const education = [
  {
    system: "國小",
    grades: ["一年級", "二年級", "三年級", "四年級", "五年級", "六年級"],
    sujects: ["國語", "英語", "數學", "自然", "社會", "閩客語", "科技"],
    types: ["課本進度", "素養主題", "卓越盃", "段考複習", "音檔"]
  },
  {
    system: "國中",
    grades: ["七年級", "八年級", "九年級"],
    sujects: ["國語", "英語", "數學", "自然", "社會", "閩客語", "科技"],
    types: ["課本進度", "素養主題", "卓越盃", "會考衝刺", "段考複習", "音檔", "國中先修班"]
  }
]

const Filter = ({ isClosing, setIsClosing }: { isClosing: boolean, setIsClosing: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [systemSet, setSystemSet] = useState(new Set(["國小"]))
  const [gradesSet, setGradesSet] = useState(new Set())
  const [sujectsSet, setSujectsSet] = useState(new Set())
  const [typesSet, setTypesSet] = useState(new Set())

  const handleChangSystem = (system: string) => {
    if (!systemSet.has(system)) {
      setSystemSet(() => {
        const newSet = new Set([system])
        newSet.add(system)
        return newSet
      })
    }
  }

  const handleChangGrades = (grade: string) => {
    if (!gradesSet.has(grade)) {
      setGradesSet(() => {
        const newSet = new Set([grade])
        newSet.add(grade)
        return newSet
      })
    }
  }

  const handleChangSujects = (sujects: string) => {
    if (sujectsSet.has(sujects)) {
      setSujectsSet(prev => {
        const newSet = new Set([...prev].filter(item=> item !== sujects))
        return newSet
      })
    } else if (!sujectsSet.has(sujects)) {
      setSujectsSet(prev => {
        const newSet = new Set([...prev])
        newSet.add(sujects)
        return newSet
      })
    }
  }

  const handleChangTypes = (type: string) => {
    if (typesSet.has(type)) {
      setTypesSet(prev => {
        const newSet = new Set([...prev].filter(item=> item !== type))
        return newSet
      })
    } else if (!typesSet.has(type)) {
      setTypesSet(prev => {
        const newSet = new Set([...prev])
        newSet.add(type)
        return newSet
      })
    }
  }

  const handleClearFliter = () => {
    setGradesSet(new Set())
    setSujectsSet(new Set())
    setTypesSet(new Set())
  }

  const handleClearSujects = () => {
    setSujectsSet(new Set())
  }

  const handleClearTypes = () => {
    setTypesSet(new Set())
  }

  const handleCloseFilter = () => {
    setIsClosing(true)
  }


  return (
    <div
      className="fixed top-0 left-0 w-full h-screen md:h-fit lg:relative lg:max-w-[1140px] px-4 py-16 lg:py-0 mx-auto text-font-color bg-backgrond-color md:shadow-md lg:shadow-none"
      style={{
        transform: `${isClosing ? "translateX(100%)" : ""}`,
        transition: `${isClosing ? "opacity 0s ease 0.3s" : ""}`,
        opacity: `${isClosing ? "0" : "100"}`
      }}
    >
      <button
        className="lg:hidden absolute top-4 right-4 px-2 py-1 text-font-color border border-font-color rounded-sm"
        onClick={handleCloseFilter}
      >
        關閉
      </button>
      <div className="hidden md:flex flex-row flex-wrap gap-4 lg:gap-12 w-fit px-8 py-4 mb-4 bg-white">
        {education.map((item) => {
          return (
            <div className="flex flex-row flex-wrap flex-grow gap-6 items-center" key={item.system}>
              <p className="text-xl text-h-color">{item.system}</p>
              {item.grades.map(grade => {
                return  <button
                  className={`py-2 border border-transparent font-normal text-base ${gradesSet.has(grade) ? "text-active-color border-b-active-color" : "lg:hover:opacity-70"}`}
                  onClick={() => handleChangGrades(grade)}
                  key={grade}
                >
                  {grade}
                </button>
              }
              )}
            </div>
          )
        })}
      </div>
      <div className="md:hidden flex flex-col gap-4 lg:gap-12 mx-auto mb-4 px-4 lg:px-8 py-4 bg-white">
        <div className="flex flex-row flex-grow gap-2 items-center">
          {education.map((item) => {
            return (
                <button
                  className={`w-full mx-auto px-2 pb-1 text-xl border-b-3 border-b-active-color ${systemSet.has(item.system) ? "text-active-color" : "text-h-color border-b-transparent"}`}
                onClick={() => handleChangSystem(item.system)}
                key={item.system}
                  >{item.system}</button>
            )
          })}
        </div>
        <div className="grid grid-cols-3">
          {systemSet.has("國小")
            ? education[0].grades.map(grade =>
              <button
                className={`w-fit mx-auto py-2 border border-transparent font-normal text-base lg:hover:opacity-70 ${gradesSet.has(grade) ? "text-active-color border-b-active-color" : ""}`}
                onClick={() => handleChangGrades(grade)}
                key={grade}
              >
                {grade}
              </button>)
            : education[1].grades.map(grade =>
              <button
                className={`w-fit mx-auto py-2 border border-transparent font-normal text-base lg:hover:opacity-70 ${gradesSet.has(grade) ? "text-active-color border-b-active-color" : ""}`}
                onClick={() => handleChangGrades(grade)}
                key={grade}
              >
                {grade}
              </button>)
          }
        </div>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap gap-3 lg:items-center px-4 lg:px-8 py-3">
        <p className="lg:mr-2 text-xl text-h-color shrink-0">科目</p>
        <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 md:gap-2 items-center">
          <button
            className={`px-2 py-1 border rounded-sm ${sujectsSet.size === 0 ? "bg-active-color/5 text-active-color border-active-color" : "bg-white border-border-color lg:hover:opacity-70"}`}
            onClick={handleClearSujects}
          >全部
          </button>
          {education[0].sujects.map(suject =>
            <button
              className={`px-2 py-1 border rounded-sm font-normal text-base lg:hover:opacity-70 ${sujectsSet.has(suject) ? "bg-active-color/5 text-active-color border-active-color" : "bg-white border-border-color"}`}
              onClick={() => handleChangSujects(suject)}
              key={suject}
            >{suject}</button>
          )}
          </div>
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap gap-3 lg:items-center px-4 lg:px-8 py-3">
        <p className="lg:mr-2 text-xl text-h-color shrink-0">種類</p>
        <div className="flex flex-row flex-wrap gap-y-3 gap-x-2 md:gap-2 items-center">
          <button
            className={`px-2 py-1 border rounded-sm ${typesSet.size === 0 ? "bg-active-color/5 text-active-color border-active-color" : "bg-white border-border-color lg:hover:opacity-70"}`}
            onClick={handleClearTypes}
          >
            全部
          </button>
          {gradesSet.has("一年級") || gradesSet.has("二年級") || gradesSet.has("三年級") || gradesSet.has("四年級") || gradesSet.has("五年級") || gradesSet.has("六年級") 
            ? education[0].types.map(type =>
              <button
                className={`px-2 py-1 border rounded-sm font-normal text-base lg:hover:opacity-70 ${typesSet.has(type) ? "bg-active-color/5 text-active-color border-active-color" : "bg-white border-border-color"}`}
                onClick={() => handleChangTypes(type)}
                key={type}
              >{type}</button>
              )
            : education[1].types.map(type =>
            <button
              className={`px-2 py-1 border rounded-sm font-normal text-base lg:hover:opacity-70 ${typesSet.has(type) ? "bg-active-color/5 text-active-color border-active-color" : "bg-white border-border-color"}`}
                onClick={() => handleChangTypes(type)}
                key={type}
              >
                {type}</button>
            )
          }
        </div>
      </div>
      <div className="fixed bottom-0 left-0 md:relative flex flex-row justify-between lg:justify-end w-full px-4 md:px-6 py-4 lg:px-4 lg:py-3 lg:-translate-y-full md:text-end md:pointer-events-none ">
        <button
          className="relative px-2 py-1 after:bg-translate after:absolute after:bottom-0 after:left-1/10 after:w-8/10 after:h-[2px] lg:hover:after:bg-border-color lg:hover:opacity-70 pointer-events-auto"
          onClick={handleClearFliter}
        >
          清除選項
        </button>
        <button
          className="lg:hidden relative min-h-[44px] px-8 py-2 border border-border-color rounded-full bg-active-color text-white pointer-events-auto"
          onClick={handleCloseFilter}
        >
          套用篩選
        </button>
      </div>
    </div>
  )
}

export default Filter