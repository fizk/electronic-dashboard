import React from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import {WantListEntry} from '../types.d';
import WantList from '../components/WantList';
import { LabelInput } from '../elements/Form';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default () => {
    const queryClient = useQueryClient()
    const query = useQuery({ queryKey: ['wantlist'], queryFn: async(): Promise<WantListEntry[]> => {
        const request = await fetch('/electronic/api/wantlist');
        const response = request.json();
        return response;
    } });

    const updateMutation = useMutation({
        mutationFn: async (item: WantListEntry): Promise<any>  => {
            const formData = new FormData();
            formData.set('done', String(item.done ? 0 : 1));

            const response = await fetch(`/electronic/api/wantlist/${item.id}`, {
                method: 'PATCH',
                body: formData
            });

            queryClient.setQueryData(['wantlist'], (old: WantListEntry[]) => (
                old.map((i: WantListEntry) => (
                    i.id === item.id ? {...i, done: (item.done ? false : true)} : i
                ))
            ));

            return {data: await response.json()};
        },
        onError: (error, variables, context) => {
            console.log({error, variables, context});
        }
    });

    const createMutation = useMutation({
        mutationFn: async (form: FormData): Promise<any>  => {
            const response = await fetch(`/electronic/api/wantlist`, {
                method: 'POST',
                body: form,
            });
            if (response.status !== 201) {throw new Error('this is some error')}

            const optimistic = {
                id: getRandomInt(1000, 999999),
                name: form.get('name'),
                description: form.get('description'),
                done: false,
                date: new Date().getTime(),
            };

            queryClient.setQueryData(['wantlist'], (old: any[]) => [...old, optimistic]);

            return {data: await response.json(), optimistic};
        },
        onSuccess: async (response: Record<string, any>, variables: FormData, context) => {
            queryClient.setQueryData(['wantlist'], (old: any[]) =>
                old.map((item) => {
                    return item.id === response.optimistic.id ? {...item, id: response.data.lastID} : item;
                })
            )
        },
        onError: (error, variables, context) => {
            console.log({error, variables, context});
        }
    });
    
    const handleCheck = (item: WantListEntry) => {
        updateMutation.mutate(item);
    }

    const handleCreate = (event) => {
        event.preventDefault();
        createMutation.mutate(new FormData(event.target))
    }

    return (
        <div>
            <h2>WantList</h2>
            <WantList items={query.data || []} onSelect={handleCheck} />

            <form onSubmit={handleCreate}>
                <LabelInput text="text" name="name" />
                <textarea name="description" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}
