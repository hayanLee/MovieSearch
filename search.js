//원하는 제목의 영화만 검색(필터링)
export function handleForm(e) {
    e.preventDefault();
    let text = e.target[0].value;

    if (text.trim() === '') return; // 빈 검색어 제거

    const $cards = document.querySelectorAll('.card');
    $cards.forEach((card) => {
        let search = card.children[1].textContent.toLowerCase();
        if (search.includes(text.toLowerCase())) card.style.display = 'block';
        else card.style.display = 'none';
    });
}
