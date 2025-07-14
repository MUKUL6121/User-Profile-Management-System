export default function Filter() {
    const select = document.getElementById('actionSelect').value;

    // Get input elements by ID
    const preid = document.getElementById('preid');
    const eid = document.getElementById('eid');
    const name = document.getElementById('name');
    const salary = document.getElementById('salary');

    // Get parent divs (to show/hide whole blocks)
    const divPreid = document.getElementById('input1');
    const divEid = document.getElementById('input2');
    const divName = document.getElementById('input3');
    const divSalary = document.getElementById('input4');

    if (select === 'All') {
        divPreid.style.display = 'none';
        preid.removeAttribute('required');

        divEid.style.display = 'none';
        eid.removeAttribute('required');

        divName.style.display = 'none';
        name.removeAttribute('required');

        divSalary.style.display = 'none';
        salary.removeAttribute('required');
    }
    else if (select === 'Find') {
        divPreid.style.display = 'none';
        preid.removeAttribute('required');

        divEid.style.display = 'block';
        eid.setAttribute('required', true);

        divName.style.display = 'none';
        name.removeAttribute('required');

        divSalary.style.display = 'none';
        salary.removeAttribute('required');
    } else if (select === 'Create') {
        divPreid.style.display = 'none';
        preid.removeAttribute('required');

        divEid.style.display = 'block';
        eid.setAttribute('required', true);

        divName.style.display = 'block';
        name.setAttribute('required', true);

        divSalary.style.display = 'block';
        salary.setAttribute('required', true);
    } else if (select === 'Delete') {
        divPreid.style.display = 'none';
        preid.removeAttribute('required');

        divEid.style.display = 'block';
        eid.setAttribute('required', true);

        divName.style.display = 'none';
        name.removeAttribute('required');

        divSalary.style.display = 'none';
        salary.removeAttribute('required');
    } else if (select === 'Update') {
        divPreid.style.display = 'block';
        preid.setAttribute('required', true);

        divEid.style.display = 'block';
        eid.setAttribute('required', true);

        divName.style.display = 'block';
        name.setAttribute('required', true);

        divSalary.style.display = 'block';
        salary.setAttribute('required', true);
    }
}
