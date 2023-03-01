import { ChangeEvent, CSSProperties, KeyboardEvent, useRef, useState } from 'react'

interface TimerForm {
  minutes: string
  seconds: string
}

function App(): JSX.Element {
  const modalTriggerRef = useRef<HTMLInputElement>(null)
  const [timerForm, setTimerForm] = useState<TimerForm>({ minutes: '', seconds: '' })

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
    console.log({ timerForm })
    toggleModal()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (['e', '-', ',', '.'].includes(e.key)) {
      e.preventDefault()
    }
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
          <button className="btn btn-sm btn-success">Play</button>
          <button className="btn btn-sm btn-warning">Pause</button>
          <button className="btn btn-sm btn-error">Reset</button>
        </div>
        <div className="grid grid-flow-col text-center auto-cols-max items-center">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-8xl">
              <span style={{ '--value': 15 } as CSSProperties}></span>
            </span>
          </div>
          <span className="font-mono text-8xl">:</span>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-8xl">
              <span style={{ '--value': 15 } as CSSProperties}></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
