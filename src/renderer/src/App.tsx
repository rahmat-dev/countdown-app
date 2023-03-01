import { ChangeEvent, CSSProperties, KeyboardEvent, useEffect, useRef, useState } from 'react'

interface TimerForm {
  minutes: string
  seconds: string
}

let timer

function App(): JSX.Element {
  const modalTriggerRef = useRef<HTMLInputElement>(null)
  const [timerForm, setTimerForm] = useState<TimerForm>({ minutes: '', seconds: '' })
  const [countdown, setCountdown] = useState<number>(0)
  const [isCounting, setIsCounting] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)

  useEffect(() => {
    if (countdown === 0 && isCounting) {
      reset()
    }
  }, [countdown])

  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60

  const toggleModal = (): void => {
    modalTriggerRef.current?.click()
  }

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>): void => {
    setTimerForm((_timerForm) => ({
      ..._timerForm,
      [e.target.name]: e.target.value
    }))
  }

  const handleSaveTimer = (): void => {
    setCountdown(+timerForm.minutes * 60 + +timerForm.seconds)
    toggleModal()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (['e', '-', ',', '.'].includes(e.key)) {
      e.preventDefault()
    }
  }

  const start = (): void => {
    setIsCounting(true)
    timer = setInterval(() => {
      setCountdown((_countdown) => _countdown - 1)
    }, 1000)
  }

  const reset = (): void => {
    setCountdown(0)
    setIsCounting(false)
    setIsPaused(false)
    clearInterval(timer)
  }

  const pause = (): void => {
    setIsPaused(true)
    clearInterval(timer)
  }

  const resume = (): void => {
    setIsPaused(false)
    timer = setInterval(() => {
      setCountdown((_countdown) => _countdown - 1)
    }, 1000)
  }

  return (
    <div className="container bg-slate-900 h-screen grid place-items-center">
      <input type="checkbox" className="modal-toggle" ref={modalTriggerRef} />
      <div className="modal">
        <div className="modal-box flex w-fit max-h-fit gap-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text-alt">Minutes</span>
            </label>
            <input
              type="number"
              placeholder="0"
              className="input input-bordered input-sm w-28"
              min={0}
              name="minutes"
              value={timerForm.minutes}
              onChange={handleChangeForm}
              onKeyDown={onKeyDown}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text-alt">Seconds</span>
            </label>
            <input
              type="number"
              placeholder="0"
              className="input input-bordered input-sm w-28"
              min={0}
              name="seconds"
              value={timerForm.seconds}
              onChange={handleChangeForm}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text-alt">&nbsp;</span>
            </label>
            <button className="btn btn-sm btn-success" onClick={handleSaveTimer}>
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex flex-col justify-between gap-2">
          <button className="btn btn-sm btn-info" onClick={toggleModal}>
            Set Timer
          </button>
          {!isCounting && (
            <button
              className="btn btn-sm btn-success disabled:btn-success disabled:opacity-30"
              disabled={countdown <= 0}
              onClick={start}
            >
              Start
            </button>
          )}
          {isCounting && (
            <button className="btn btn-sm btn-warning" onClick={isPaused ? resume : pause}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
          <button
            className="btn btn-sm btn-error disabled:btn-error disabled:opacity-30"
            disabled={!isCounting}
            onClick={reset}
          >
            Reset
          </button>
        </div>
        <div className="grid grid-flow-col text-center auto-cols-max items-center">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-8xl">
              <span style={{ '--value': minutes } as CSSProperties}></span>
            </span>
          </div>
          <span className="font-mono text-8xl">:</span>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-8xl">
              <span style={{ '--value': seconds } as CSSProperties}></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
