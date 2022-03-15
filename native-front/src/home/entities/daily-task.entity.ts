import { Routes } from '../../routers/HomeRouter'

export class DailyTask {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly route: Routes,
  ) {}
}
