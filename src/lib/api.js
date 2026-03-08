// API 연동 함수 모음
const API_BASE = "/api";

export async function fetchQuestions() {
  const res = await fetch(`${API_BASE}/question?secret=0000`);
  if (!res.ok) throw new Error("질문 목록을 불러오지 못했습니다");
  const json = await res.json();
  return json.data || [];
}

export async function fetchQuestionDetail(id) {
  const res = await fetch(`${API_BASE}/question/${id}`);
  if (!res.ok) throw new Error("질문 상세를 불러오지 못했습니다");
  const json = await res.json();
  return json.data || null;
}

export async function postQuestion(question) {
  const res = await fetch(`${API_BASE}/question`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "질문 등록 실패");
  return json.data;
}
