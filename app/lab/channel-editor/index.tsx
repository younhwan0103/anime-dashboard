import { readChannels } from "@/lib/channel-store";
import { ChannelEditorForm } from "./form";

// "use client" 없음 — 쿠키를 읽어야 하므로 서버 컴포넌트다.
// 이 컴포넌트 때문에 /lab이 정적(○)에서 동적(ƒ)으로 바뀐다.
export async function ChannelEditor() {
  const channels = await readChannels();
  return <ChannelEditorForm channels={channels} />;