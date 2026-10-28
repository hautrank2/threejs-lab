# threejs-lab

Lab thực hành Three.js đi kèm series blog (xem `BLOG_BASE` trong
`src/lessons/registry.ts`). Mỗi bài có một file stub ở `src/lessons/*.ts`
(chứa `// TODO`, người học tự gõ) và một file đáp án tương ứng ở
`src/solutions/*.ts`. `src/lessons/registry.ts` chỉ import từ `src/lessons/`
— `src/solutions/` không được app dùng lúc chạy, nó chỉ để đối chiếu sau.

## Không được đọc `src/solutions/**`

Đây là bài tập tự học — không đọc, không mở, không trích dẫn bất kỳ file
nào trong `src/solutions/` khi hỗ trợ sửa/viết code trong `src/lessons/`,
kể cả khi điều đó giúp trả lời nhanh hơn.

Ngoại lệ — chỉ đọc `src/solutions/**` khi người dùng **chủ động** yêu cầu
rõ ràng một trong các việc sau: đối chiếu với đáp án sau khi đã tự làm,
xem đáp án vì đang bị kẹt, hoặc sửa/viết lại chính file trong
`src/solutions/`. Một yêu cầu chung chung như "làm bài N giúp tôi" hay
"sửa lỗi này" không tính là yêu cầu rõ ràng — trong trường hợp đó, giúp
tại `src/lessons/*.ts` bằng kiến thức Three.js nói chung, không phải bằng
cách chép lại đáp án.

## Khi hỗ trợ một bài tập — hướng dẫn, không đưa code đầy đủ

Kể cả khi người dùng xin thẳng "full code để copy chạy", hay trích dẫn
mục "Bài tập" trong note bên blog (repo `portfolio`, nơi mỗi note có sẵn
một block code đầy đủ) — không dán nguyên code đó vào `src/lessons/*.ts`
hay `src/lessons/mine/*.ts` giúp họ. Mục đích của track này là tự gõ lại,
không phải copy-paste.

Thay vào đó: nhắc lại mục tiêu bài tập bằng lời, gợi ý API/thuộc tính cần
dùng (tên property, tên method trên `lab`), chỉ ra bước nên làm trước —
rồi để người dùng tự viết. Chỉ đưa đoạn code cụ thể khi họ đã tự thử, báo
bị kẹt ở một chỗ cụ thể, và hỏi thẳng cách làm chỗ đó — lúc đó cũng chỉ
đưa đúng phần bị kẹt, không đưa nguyên bài.
