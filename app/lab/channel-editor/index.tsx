import { ChannelEditorForm } from "./form";
import type { Channel } from "@/lib/channels";

// 서버 컴포넌트.
// channels는 page.tsx에서 한 번 읽어 prop으로 전달받는다.
export function ChannelEditor({ channels }: { channels: Channel[] }) {
  return <ChannelEditorForm channels={channels} />;
}
