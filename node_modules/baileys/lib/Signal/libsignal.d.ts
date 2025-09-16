import type { SignalAuthState } from '../Types/index.js';
import type { SignalRepository } from '../Types/Signal.js';
export declare function makeLibSignalRepository(auth: SignalAuthState, onWhatsAppFunc?: (...jids: string[]) => Promise<{
    jid: string;
    exists: boolean;
    lid: string;
}[] | undefined>): SignalRepository;
//# sourceMappingURL=libsignal.d.ts.map