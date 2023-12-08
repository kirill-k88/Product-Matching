interface Position {
  position: number;
  percentage: number;
}

export interface Analytics {
  matched: number;
  not_matched: number;
  deferred: number;
  total_matching: number;
  accuracy: number;
  position: Position[];
}
