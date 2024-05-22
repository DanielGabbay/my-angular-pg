import { computed, isSignal, Signal, signal } from '@angular/core';
import { src } from './connect-signals';

export type Reducer<T, TPayload = any> = (state: T, payload?: TPayload) => T;

export type Reducers<T> = {
  [K: string]: Reducer<T, any>;
};

export type ActionSignal<T, TPayload extends Reducers<T>> = Signal<T> & {
  [K in keyof TPayload]: TPayload[K] extends (state: T, payload: infer P) => T
    ? (payload?: P) => void
    : (payload?: Parameters<TPayload[K]>[1]) => void;
};

export function reducerSignal<T, TPayload extends Reducers<T>>(
  initialValue: T,
  reducers: TPayload
): ActionSignal<T, TPayload> {
  const writableSignal = signal(initialValue);
  const readonlySignal = computed(() => writableSignal());

  for (const [key, reducer] of Object.entries(reducers)) {
    Object.defineProperty(readonlySignal, key, {
      value: (payload?: any) => {
        while (isSignal(payload)) {
          payload = payload();
        }
        writableSignal.set(reducer(readonlySignal(), payload));
      },
    });
  }

  return readonlySignal as ActionSignal<T, TPayload>;
}

type IUser = {
  name: string;
  age: number;
  props: {
    isAdmin: boolean;
    memory: string;
    notes: Record<string, string>;
    moreData: {
      lastLogin: Date;
    };
  };
  ageGroup: 'child' | 'adult' | 'senior';
};

type UserPropsActions = {
  setIsAdmin: (state: IUser['props'], isAdmin: boolean) => IUser['props'];
  setNotes: (
    state: IUser['props'],
    notes: Record<string, string>
  ) => IUser['props'];
  setMoreData: (
    state: IUser['props'],
    moreData: { lastLogin: Date }
  ) => IUser['props'];
  set: (
    state: IUser['props'],
    payload: Partial<IUser['props']>
  ) => IUser['props'];
};

export class User implements IUser {
  public name: string;
  public age: number;
  public ageGroup: 'child' | 'adult' | 'senior';
  /* -------------------------------------------------------------------------------------------------------------- */

  public props: {
    isAdmin: boolean;
    memory: string;
    notes: Record<string, string>;
    moreData: {
      lastLogin: Date;
    };
  };

  @src('props', 'set')
  props$ = reducerSignal<IUser['props'], UserPropsActions>(
    {} as IUser['props'],
    {
      setIsAdmin: (state, isAdmin) => ({ ...state, isAdmin }),
      setNotes: (state, notes) => ({ ...state, notes }),
      setMoreData: (state, moreData) => ({ ...state, moreData }),
      set: (state, payload) => ({ ...state, ...payload }),
    }
  );

  constructor(init: Partial<IUser>) {
    this.name = init.name;
    this.age = init.age;
    this.props = init.props;
    this.ageGroup = init.ageGroup;
  }
}

const usersManager: User[] = [
  new User({
    name: 'John Doe',
    age: 30,
    ageGroup: 'adult',
    props: {
      isAdmin: true,
      memory: '',
      notes: {
        'note-1': 'This is note 1',
        'note-2': 'This is note 2',
      },
      moreData: {
        lastLogin: new Date(),
      },
    },
  }),
  new User({
    name: 'Jane Doe',
    age: 25,
    ageGroup: 'adult',
    props: {
      isAdmin: false,
      memory: '',
      notes: {
        'note-1': 'This is note 1',
        'note-2': 'This is note 2',
      },
      moreData: {
        lastLogin: new Date(),
      },
    },
  }),
  new User({
    name: 'John Smith',
    age: 55,
    ageGroup: 'senior',
    props: {
      isAdmin: true,
      memory: '',
      notes: {
        'note-1': 'This is note 1',
        'note-2': 'This is note 2',
      },
      moreData: {
        lastLogin: new Date(),
      },
    },
  }),
  new User({
    name: 'Rivka Cohen',
    age: 12,
    ageGroup: 'child',
    props: {
      isAdmin: true,
      memory: '',
      notes: {
        'note-1': 'This is note 1',
        'note-2': 'This is note 2',
      },
      moreData: {
        lastLogin: new Date(),
      },
    },
  }),
];
