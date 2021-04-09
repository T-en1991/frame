// 特殊字符转义
export function escapeHTML(value) {
  if (typeof value !== "string") {
    return value;
  }
  return value
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// 特殊字符反转义
export function unescapeHTML(value) {
  if (typeof value !== "string") {
    return value;
  }
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}
