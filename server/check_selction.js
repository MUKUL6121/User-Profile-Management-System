export function check_selection(selectedOption) {
    const a = document.getElementById("input1");
    const b = document.getElementById("input2");
    const c = document.getElementById("input3");
    const d = document.getElementById("input4");

    if (selectedOption === "Read") {
        a.style.display = 'none';
        b.style.display = 'none';
        c.style.display = 'none';
        d.style.display = 'none';
    } else if (selectedOption === "Create" || selectedOption === "Update") {
        a.style.display = 'none';
        b.style.display = 'block';
        c.style.display = 'block';
        d.style.display = 'block';
    } else if (selectedOption === "Delete") {
        a.style.display = 'none';
        b.style.display = 'block';
        c.style.display = 'none';
        d.style.display = 'none';
    }
    else if(selectedOption === 'Update'){
        a.style.display = 'block';
        b.style.display = 'block';
        c.style.display = 'block';
        d.style.display = 'block';
    }
}
