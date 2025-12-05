import { EventEmitter } from 'events';
import { FirestorePermissionError } from './errors';

// Type definition for the events that can be emitted.
type AppEvents = {
  'permission-error': (error: FirestorePermissionError) => void;
};

// A custom EventEmitter class with typed events.
class TypedEventEmitter extends EventEmitter {
  emit<T extends keyof AppEvents>(event: T, ...args: Parameters<AppEvents[T]>): boolean {
    return super.emit(event, ...args);
  }

  on<T extends keyof AppEvents>(event: T, listener: AppEvents[T]): this {
    return super.on(event, listener);
  }
}

/**
 * A global, singleton event emitter for application-wide events.
 * This is used to decouple components, particularly for error handling.
 * For example, a Firestore utility can emit a 'permission-error' event
 * without needing to know which UI component will handle it.
 */
export const errorEmitter = new TypedEventEmitter();
