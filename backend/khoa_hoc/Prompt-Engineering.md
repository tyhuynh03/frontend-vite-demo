# Prompt Engineering (Google)

## 1. Giới thiệu sơ lược

Khóa học giới thiệu các nguyên tắc và kỹ thuật thiết kế Prompt cho mô hình ngôn ngữ lớn (LLM). Người học sẽ nắm vững cách kiểm soát đầu ra, áp dụng các kỹ thuật prompting từ cơ bản (zero-shot, few-shot) đến nâng cao (Chain of Thought, Tree of Thoughts, ReAct…), đồng thời thực hành với các tình huống thực tế như sinh code, dịch code, gỡ lỗi và đa phương thức.

## 2. Yêu cầu đầu vào

**Kỹ năng cần có trước khi học:**
- **Kiến thức cơ bản về AI và LLM** (GPT, PaLM, LLaMA…)
- **Biết cách sử dụng ít nhất một công cụ LLM** (ChatGPT, Gemini, Claude…)
- **Có kỹ năng lập trình Python cơ bản** (phục vụ cho phần code prompting)

## 3. Mục tiêu khóa học

Sau khi hoàn thành, học viên sẽ:
- ✅ Hiểu cách cấu hình và kiểm soát đầu ra của LLM
- ✅ Nắm vững các kỹ thuật prompting: Zero-shot, Few-shot, Role prompting, Chain of Thought, ReAct, v.v.
- ✅ Biết cách áp dụng prompt vào lập trình (viết code, giải thích code, dịch code, debug code)
- ✅ Biết xây dựng prompt đa phương thức (multimodal)
- ✅ Vận dụng best practices để thiết kế prompt rõ ràng, hiệu quả và bền vững khi mô hình cập nhật

## 4. Nội dung khóa học

**Phần I: Cơ bản**
- Bài 1: Introduction
- Bài 2: Prompt engineering – Khái niệm và vai trò

**Phần II: Cấu hình đầu ra LLM**
- Bài 3: Output length
- Bài 4: Sampling controls
- Bài 5: Temperature
- Bài 6: Top-K và Top-P
- Bài 7: Putting it all together (kết hợp tham số)

**Phần III: Kỹ thuật Prompting**
- Bài 8: General prompting / Zero-shot
- Bài 9: One-shot & Few-shot
- Bài 10: System, Contextual và Role prompting
  - System prompting
  - Role prompting
  - Contextual prompting
- Bài 11: Step-back prompting
- Bài 12: Chain of Thought (CoT)
- Bài 13: Self-consistency
- Bài 14: Tree of Thoughts (ToT)
- Bài 15: ReAct (Reason & Act)
- Bài 16: Automatic Prompt Engineering

**Phần IV: Code Prompting**
- Bài 17: Prompts for writing code
- Bài 18: Prompts for explaining code
- Bài 19: Prompts for translating code
- Bài 20: Prompts for debugging and reviewing code

**Phần V: Prompt đa phương thức & Best Practices**
- Bài 21: What about multimodal prompting?
- Bài 22: Best Practices
  - Provide examples
  - Design with simplicity
  - Be specific about the output
  - Use Instructions over Constraints
  - Control the max token length
  - Use variables in prompts
  - Experiment with input formats & writing styles
  - Few-shot classification với dữ liệu đa dạng
  - Adapt to model updates
  - Experiment with output formats

## 5. Bài tập

- **Quiz/Test**: Sau mỗi phần để kiểm tra kiến thức
- **Project cuối khóa**:
  - Thiết kế prompt chatbot với hệ thống role + CoT
  - Ứng dụng prompting trong sinh code + debug code
  - Thực hành few-shot prompting cho phân loại văn bản

## 6. Tiến độ đề xuất

**Thời lượng**: 1–2 giờ/ngày, trong 2 tuần
- **Tuần 1**: Phần I + II + III (nền tảng và kỹ thuật prompting)
- **Tuần 2**: Phần IV + V (Code prompting, Multimodal, Best Practices) + Project

## 7. Lưu ý, ghi chú

- **Nội dung tập trung** vào prompting cho LLM (không đi sâu vào huấn luyện mô hình)
- **Người học nên thử nghiệm prompt** trực tiếp với nhiều mô hình (GPT, Gemini, Claude) để so sánh hiệu quả
