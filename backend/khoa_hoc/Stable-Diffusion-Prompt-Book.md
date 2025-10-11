# Stable Diffusion Prompt Book (THCS – Đại học – Miền năng lực số: Sáng tạo nội dung, Ứng dụng AI)

## 1. Giới thiệu sơ lược

Khóa học thực hành viết prompt tạo ảnh bằng mô hình Diffusion (Stable Diffusion/SDXL) để tạo nên hình ảnh đẹp và đa phong cách. Học viên làm chủ cấu trúc prompt, ánh sáng, bố cục, thông số sinh ảnh (sampler, steps, CFG, seed), và kỹ thuật nâng cao (negative prompt, LoRA, ControlNet, inpainting).

**Phù hợp cho**: người mới đến bán chuyên: định hướng dự án sáng tạo (portfolio, poster, concept art, minh họa).

**Nhấn mạnh**: đạo đức – an toàn – bản quyền khi ứng dụng AI trong sáng tạo nội dung.

## 2. Yêu cầu đầu vào

- **Kỹ năng máy tính cơ bản**: sử dụng trình duyệt, lưu/tải file, thao tác thư mục
- **Thiết bị**: máy tính có GPU khuyến nghị (hoặc dùng dịch vụ đám mây). Dung lượng trống ≥ 10GB nếu cài cục bộ
- **Tư duy hình ảnh cơ bản** là lợi thế (ánh sáng, màu sắc, bố cục), nhưng không bắt buộc
- **Đối tượng THCS** cần sự giám sát về nội dung; tuyệt đối tránh chủ đề không phù hợp lứa tuổi

## 3. Mục tiêu khóa học

1. Hiểu nguyên lý tổng quát của mô hình diffusion và các phiên bản Stable Diffusion (SD 1.5/2.x/SDXL)
2. Viết được prompt rõ ràng theo cấu trúc: Chủ thể – Thuộc tính – Hành động – Bối cảnh – Phong cách – Ánh sáng – Bố cục – Máy ảnh/kỹ thuật số
3. Vận dụng negative prompt để hạn chế lỗi (bóp méo giải phẫu, nhiễu, watermark, text lỗi, viền răng cưa)
4. Điều khiển ảnh bằng thông số: sampler, steps, CFG scale, seed, tỉ lệ khung hình, độ phân giải, upscaler
5. Ứng dụng kỹ thuật nâng cao: LoRA, Textual Inversion, ControlNet (canny/pose/depth), inpainting/outpainting, image-to-image
6. Xây dựng bộ preset cá nhân (prompt templates) và quy trình tái lập (ghi seed, phiên bản model, thông số)
7. Nắm nguyên tắc đạo đức – pháp lý cơ bản: bản quyền, thương hiệu, riêng tư, nội dung phù hợp lứa tuổi

## 4. Nội dung khóa học

**Mô-đun A: Nền tảng Diffusion & Prompt**
- A1. Diffusion là gì? Ảnh tổng hợp vận hành ra sao (overview không kỹ thuật)
- A2. Các dòng Stable Diffusion (1.5/2.x/SDXL) & thuật ngữ cơ bản
- A3. Công thức prompt: Chủ thể – Thuộc tính – Ngữ cảnh – Phong cách – Ánh sáng – Bố cục – Kỹ thuật

**Mô-đun B: Ánh sáng – Bố cục – Ống kính**
- B1. Từ khóa ánh sáng: soft light, backlight, rim light, golden hour, volumetric, HDR
- B2. Bố cục: rule of thirds, leading lines, symmetry, negative space, depth of field
- B3. Góc máy & ống kính: wide/tele, macro, isometric, cinematic framing

**Mô-đun C: Phong cách – Chất liệu – Thể loại**
- C1. Photorealistic vs Stylized (watercolor, oil painting, anime, pixel art)
- C2. Concept art, product shot, architectural viz, UI mockup
- C3. Kết hợp phong cách an toàn – tránh xung đột từ khóa

**Mô-đun D: Negative Prompt & Kiểm soát lỗi**
- D1. Negative prompt là gì? Khi nào dùng?
- D2. Danh mục lỗi thường gặp & cách loại bỏ (ngón tay thừa, méo, watermark, noise)
- D3. Lọc nội dung không phù hợp lứa tuổi; tuân thủ chuẩn mực cộng đồng

**Mô-đun E: Tham số sinh ảnh & Tối ưu**
- E1. Sampler, steps, CFG scale – tác động đến chất lượng & thời gian
- E2. Seed, tỉ lệ khung hình, độ phân giải, hi-res fix, upscalers
- E3. Batch size, reproducibility, quản lý preset

**Mô-đun F: Mô hình & Tiện ích nâng cao**
- F1. Checkpoint, VAE, Textual Inversion, LoRA: chọn & kết hợp an toàn
- F2. ControlNet (canny/pose/depth), IP-Adapter, reference image
- F3. Image-to-Image, Inpainting/Outpainting, denoise strength

**Mô-đun G: Quy trình làm việc & Công cụ**
- G1. Giao diện phổ biến: Automatic1111 vs ComfyUI – so sánh nhanh
- G2. Lưu trữ & đặt tên: model, LoRA, preset, seed, metadata
- G3. Tái lập & chia sẻ: gallery, grid, prompt cookbook

**Mô-đun H: Đạo đức – Pháp lý – An toàn nội dung**
- H1. Bản quyền hình ảnh, thương hiệu, chân dung; tôn trọng tác giả gốc
- H2. Quy định nội dung: tránh bạo lực, khiêu dâm, xúc phạm; đặc biệt với người dưới 18 tuổi
- H3. Thiên lệch & đa dạng: dùng từ khóa tôn trọng văn hóa – giới; gắn watermark/ghi chú AI khi cần

**Mô-đun I: Dự án cuối khóa – Prompt Cookbook & Bộ sưu tập ảnh**
- I1. Xây chủ đề (ví dụ: "Cảnh đêm thành phố mưa" hoặc "Sản phẩm công nghệ tối giản")
- I2. Lập preset (prompt + negative + tham số), ghi seed & phiên bản model
- I3. Trình bày bộ ảnh (10–15 tấm) + tài liệu Prompt Cookbook kèm minh họa trước–sau

## 5. Bài tập

- **Quiz nhanh cuối bài** (thuật ngữ, tác dụng tham số)
- **Mini-test theo mô-đun**: viết prompt cho mục tiêu/ảnh yêu cầu
- **Đánh giá dự án** (rubric 10 điểm): rõ mục tiêu (2đ) – kỹ thuật & nhất quán (4đ) – thẩm mỹ & bố cục (2đ) – tuân thủ đạo đức/pháp lý (2đ)
- **Phản biện đồng đẳng** (peer review) và nộp lại sau chỉnh sửa

## 6. Tiến độ đề xuất

**Phương án 1: Bootcamp 2 ngày (mỗi ngày 3 giờ)**
- Ngày 1: A + B + C + D (làm bài tập nhanh)
- Ngày 2: E + F + G + H + I (hoàn thiện dự án)

**Phương án 2: 6 buổi x 90 phút**
- Buổi 1: A + B1
- Buổi 2: B2–B3 + C1
- Buổi 3: C2–C3 + D
- Buổi 4: E + F1
- Buổi 5: F2–F3 + G
- Buổi 6: H + I (bảo vệ dự án)

**Phương án 3: Tự học 7 ngày (30–45 phút/ngày)**
- Ngày 1: A1–A3
- Ngày 2: B1–B2
- Ngày 3: B3–C1
- Ngày 4: C2–C3
- Ngày 5: D + E1
- Ngày 6: E2–E3 + F1
- Ngày 7: F2–F3 + G + H + I

## 7. Lưu ý, ghi chú

- **Nội dung cho THCS** phải được sàng lọc, tuyệt đối tránh chủ đề nhạy cảm/không phù hợp lứa tuổi
- **Tuân thủ bản quyền & thương hiệu**; không mô phỏng phong cách cá nhân cụ thể khi chưa được phép
- **Ghi lại seed, phiên bản model/LoRA** và tham số để tái lập; chụp hình grid minh chứng
- **Nếu máy yếu**, sử dụng dịch vụ đám mây hoặc giảm độ phân giải/steps
- **Khuyến nghị chèn watermark/ghi chú** "AI-generated" khi công bố công khai
