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

export const useMstLocal = <T extends ModelPropertiesDeclaration>(
    props: T,
    initialState?: any
) => {
    const [model] = useState(() => {
        const m = types.model(props).actions((self) => ({
            set(updater: (state: typeof self) => void) {
                updater(self);
                setState(getSnapshot(cast(self)));
            },
        }));
        return m.create(
            typeof initialState === 'function' ? initialState() : initialState
        );
    });
    const [state, setState] = useState(() => getSnapshot(cast(model)));
    return [state, model.set] as [SnapshotOut<typeof model>, typeof model['set']];
};
