import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, FormRow, FormStack, LabelInput, Textarea } from '../elements/Form';
import WantlistDetails from '../components/WantlistDetails';
import type {ChangeEvent, FormEvent} from 'react';
import type { WantListEntry } from '../types.d';
import './Wantlist.css'
import { Section } from '../elements/Section';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Wantlist()  {
    const [formState, setFormState] = useState(['', '']);
    const queryClient = useQueryClient()
    const query = useQuery({ queryKey: ['wantlist'], queryFn: async(): Promise<WantListEntry[]> => {
        const request = await fetch('/electronic/api/wantlist');
        return request.json();
    } });

    const statusMutation = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['wantlist'], data.previous)
                }
            });
        },
        mutationFn: async (item: WantListEntry): Promise<any>  => {
            const formData = new FormData();
            formData.set('done', String(item.done ? 0 : 1));

            const response = fetch(`/electronic/api/wantlist/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            const previous = queryClient.getQueryData(['wantlist']);
            queryClient.setQueryData(['wantlist'], (old: WantListEntry[]) => (
                old.map((i: WantListEntry) => (
                    i.id === item.id ? {...i, done: (item.done ? false : true)} : i
                ))
            ));

            return {previous, response};
        },
    });

    const updateMutation = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(r => {
                if (r.status >= 300) {
                    queryClient.setQueryData(['wantlist'], data.previous)
                }
            });
        },
        mutationFn: async (item: WantListEntry): Promise<any>  => {
            const formData = new FormData();
            formData.set('name', item.name);
            formData.set('description', item.description!);

            const response = fetch(`/electronic/api/wantlist/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            const previous = queryClient.getQueryData(['wantlist']);
            queryClient.setQueryData(['wantlist'], (old: WantListEntry[]) => (
                old.map((i: WantListEntry) => (
                    i.id === item.id ? {...i, name: item.name, description: item.description} : i
                ))
            ));

            return {previous, response};
        },
    });

    const createMutation = useMutation({
        retry: false,
        onError: console.log,
        onSettled: (data, error, variables, context) => {
            data.response.then(async (r) => {
                const serverResponse = await r.json();
                if (r.status >= 300) {
                    queryClient.setQueryData(['wantlist'], data.previous)
                } else {
                    queryClient.setQueryData(['wantlist'], (old: any[]) =>
                        old.map((item) => {
                            return item.id === data.optimistic.id ? {...item, id: serverResponse.lastID} : item;
                        })
                    )
                }
            });
        },
        mutationFn: async (form: FormData): Promise<any>  => {
            const response = fetch(`/electronic/api/wantlist`, {
                method: 'POST',
                body: form,
            });

            const optimistic = {
                id: getRandomInt(1000, 999999),
                name: form.get('name'),
                description: form.get('description'),
                done: false,
                date: new Date().getTime(),
            };

            const previous = queryClient.getQueryData(['wantlist']);
            queryClient.setQueryData(['wantlist'], (old: any[]) => [...old, optimistic]);

            return {optimistic, previous, response};
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (item: WantListEntry): Promise<any>  => {

            const response = await fetch(`/electronic/api/wantlist/${item.id}`, {
                method: 'DELETE',
            });

            queryClient.setQueryData(['wantlist'], (old: WantListEntry[]) => (
                old.filter((i: WantListEntry) => i.id !== item.id)
            ));

            return {data: await response.json()};
        },
        onError: (error, variables, context) => {
            console.log({error, variables, context});
        }
    });
    
    const handleCheck = (item: WantListEntry) => {
        statusMutation.mutate(item);
    }

    const handleRemove = (item: WantListEntry) => {
        deleteMutation.mutate(item);
    }

    const handleCreate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createMutation.mutate(new FormData(event.currentTarget))
        setFormState(['', '']);
    }

    const handleUpdate = (item: WantListEntry) => {
        updateMutation.mutate(item);
    }

    const handleFormNameField = (event: ChangeEvent<HTMLInputElement>) => {
        setFormState([
            event.currentTarget.value,
            formState.at(1)!,
        ]);
    }

    const handleFormDescriptionField = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFormState([
            formState.at(0)!,
            event.currentTarget.value,
        ]);
    }

    return (
        <>
            <Section variant={['framed', 'raised']}>
                <ul className="wantlist-page__list">
                    {(query.data || []).map(item => (
                        <li key={item.id} className="wantlist-page__item">
                            <WantlistDetails item={item} 
                                onSelect={handleCheck} 
                                onRemove={handleRemove} 
                                onUpdate={handleUpdate} />
                        </li>
                    ))}
                </ul>
            </Section>
            <aside className="wantlist-page__form-container">
                <h3>Create new wantlist item</h3>
                <form onSubmit={handleCreate} autoComplete="off">
                    <FormStack>
                        <FormRow variants={['stretch']}>
                            <LabelInput text="text" name="name" value={formState.at(0)} onChange={handleFormNameField} />
                            <Button type="submit" kind="secondary">create</Button>
                        </FormRow>
                        <Textarea text="description" name="description" value={formState.at(1)} onChange={handleFormDescriptionField} />
                    </FormStack>
                </form>
            </aside>
        </>
    )
}
