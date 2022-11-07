import {
    cast,
    getSnapshot,
    ModelInstanceType,
    ModelPropertiesDeclaration,
    ModelPropertiesDeclarationToProperties,
    SnapshotOut,
    types,
} from 'mobx-state-tree';
import { useState } from 'react';

type InstanceType<T extends ModelPropertiesDeclaration> = ModelInstanceType<ModelPropertiesDeclarationToProperties<T>, {}>;

export type Updater<T extends ModelPropertiesDeclaration> = (state: InstanceType<T>) => void;
export type Snapshot<T extends ModelPropertiesDeclaration> = SnapshotOut<InstanceType<T>>;

export const useMstImmer = <T extends ModelPropertiesDeclaration>(
    props: T,
    initialState?: any
) => {
    const [model] = useState(() => {
        const m = types.model(props).actions((self) => ({
            set(updater: Updater<T>) {
                updater(self);
                setSnapshot(getSnapshot(cast(self)));
            },
        }));
        return m.create(
            typeof initialState === 'function' ? initialState() : initialState
        );
    });
    const [snapshot, setSnapshot] = useState(() => getSnapshot(cast(model)));
    return [snapshot, model.set] as [SnapshotOut<typeof model>, typeof model['set']];
};