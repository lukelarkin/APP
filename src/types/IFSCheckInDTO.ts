export interface IFSCheckInDTO {
  id?: string;
  userId: string;
  date?: string; // ISO date string
  archetype?: string;
  partStage?: string;
  reflection?: string;
  tokens?: number;
  activePart?: string;
  selfState?: boolean;
  synced?: boolean;
}
