import React, { useRef, useState, useEffect }  from 'react';
import { Button, FormRow, Textarea, Toggle } from './Form';
import Info from '../icons/Info';
import Basket from '../icons/Basket';
import Markdown from 'react-markdown';
import type { Value, CapacitorValue, ResistorValue } from '../types';
import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import './ToggleableValueItem.css';


interface Props<T extends Value> {
    item: T,
    onSelect?: (item: T) => void
    onAdd?: (item: T) => void
    onUpdate?: (item: T) => void
    formatLabel?: (value: T) => ReactNode
    formatValue?: (value: T) => ReactNode
}

export default function ToggleableValueItem <T extends Value, >({
    item,
    onSelect = (item: T) => {},
    onAdd = (item: T) => {},
    onUpdate = (item: T) => {},
    formatLabel = (value: T) => (<>{String(value)}</>),
    formatValue = (value: T) => (<>{String(value)}</>),
}: Props<T>) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [text, setText] = useState(item.notes);

    useEffect(() => {
        isOpenDialog && dialogRef.current?.showModal();
        !isOpenDialog && dialogRef.current?.close();
    }, [isOpenDialog]);

    const handleToggleDialog = (status: boolean) => {
        setIsOpenDialog(status);
    }
    const handleToggleEdit = (status: boolean) => {
        setIsEditDialog(status);
    }
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.currentTarget.value);
    }
    const handleSave = (event: MouseEvent<HTMLButtonElement>) => {
        onUpdate({
            ...item,
            notes: text
        });
        setIsEditDialog(false);
    }

    return (
        <>
            <header className="toggleable-value-item__header">
                <Toggle checked={item.active} onToggle={() => onSelect(item)} />
                <span className="toggleable-value-item__label">{formatLabel(item)}</span>
                <div className="toggleable-value-item__controls">
                    <Info onClick={() => handleToggleDialog(!isOpenDialog)} kind={item.notes ? 'normal' : 'disabled' } />
                    <Basket onClick={() => onAdd(item)} />
                </div>
            </header>
            <dialog className="toggleable-value-item__dialog" ref={dialogRef} onClose={() => handleToggleDialog(false)}>
                    {isEditDialog && (
                        <div className="toggleable-value-item__dialog-content">
                            <header className="toggleable-value-item__dialog-header">
                                {formatValue(item)}
                            </header>
                            <section className="toggleable-value-item__dialog-description">
                            <Textarea value={text as string} onChange={handleTextChange} autoFocus={true} />
                            </section>
                            <footer className="toggleable-value-item__dialog-footer">
                                <FormRow variants={['end']}>
                                    <Button kind="warning" onClick={handleSave}>save</Button>
                                    <Button kind="danger" onClick={() => setIsEditDialog(false)}>cancel</Button>
                                </FormRow>
                            </footer>
                        </div>
                    )}
                    {!isEditDialog && (
                        <div className="toggleable-value-item__dialog-content">
                            <header className="toggleable-value-item__dialog-header">
                                {formatValue(item)}
                            </header>
                            <section className="toggleable-value-item__dialog-description">
                                <Markdown>{item?.notes || ''}</Markdown>
                            </section>
                            <footer className="toggleable-value-item__dialog-footer">
                                <FormRow variants={['end']}>
                                    <Button kind="warning" autoFocus={true} onClick={() => handleToggleEdit(true)}>edit</Button>
                                    <Button onClick={() => handleToggleDialog(false)}>close</Button>
                                </FormRow>
                            </footer>
                        </div>
                    )}
             </dialog>
        </>
    )
}

export const capacitorValueFormat = (value: CapacitorValue): ReactNode => {
    return (
        <>
            {value.farad < 1000 && (
                <h3>{value.micro_value}</h3>
            )}
            {value.farad < 1000 && (
                <h3>{value.farad_value}</h3>
            )}
        </>
    );
}

export const capacitorLabelFormatter = (item: CapacitorValue): ReactNode => {
    return (
        <>
            {item.micro >= 0.000001 && item.micro < 0.0001 && (
                <div className="capacitors-page__value-format">
                    <strong>{item.pico_value}</strong>
                    <small>{item.nano_value}</small>
                </div>
            )}

            {item.micro >= 0.0001 && item.micro < 0.001 && (
                <div className="capacitors-page__value-format">
                    <strong>{item.nano_value}</strong>
                    <small>{item.pico_value}</small>
                </div>
            )}

            {item.micro >= 0.001 && item.micro < 0.01 && (
                <div className="capacitors-page__value-format">
                    <strong>{item.nano_value}</strong>
                    <small>{item.micro_value}</small>
                </div>
            )}

            {item.micro >= 0.01 && item.micro < 10 && (
                <div className="capacitors-page__value-format">
                    <strong>{item.micro_value}</strong>
                    <small>{item.nano_value}</small>
                </div>
            )}

            {item.micro >= 10 && (
                <div className="capacitors-page__value-format">
                    <strong>{item.micro_value}</strong>
                </div>
            )}
        </>
    )
}


export const resistorValueFormat = (value: ResistorValue): ReactNode => {
    return value.text
}

export const resistorLabelFormatter = (value: ResistorValue): ReactNode => {
    return (
        <>
            {value.value < 1000 && <>{value.text}Ω</>}
            {value.value >= 1000 && <>{value.text}</>}
        </>
    );
}
