export type EchoType =
  | "todo"
  | "question"
  | "prediction"
  | "promise"
  | "letter"
  | "goal"
  | "freeform";

export type EchoStatus = "sealed" | "ready" | "opened" | "answered";

export type EchoResult =
  | "correct"
  | "partially_correct"
  | "wrong"
  | "completed"
  | "partially_completed"
  | "not_completed";

export interface Echo {
  id: string;
  user_id: string;
  type: EchoType;
  title: string;
  content: string;
  unlock_at: string;
  timezone: string;
  status: EchoStatus;
  created_at: string;
  updated_at: string;
  opened_at: string | null;
  answered_at: string | null;
}

export interface EchoAnswer {
  id: string;
  echo_id: string;
  user_id: string;
  answer: string;
  result: EchoResult | null;
  created_at: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export const ECHO_TYPE_LABELS: Record<EchoType, string> = {
  todo: "Future todo",
  question: "Future question",
  prediction: "Future prediction",
  promise: "Future promise",
  letter: "Future letter",
  goal: "Future goal",
  freeform: "Freeform message",
};
