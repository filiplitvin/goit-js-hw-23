let t=document.querySelector("#get-students-btn"),e=document.querySelector("#students-table tbody"),o=document.querySelector("#add-student-form"),r=document.querySelector("#name"),n=document.querySelector("#age"),l=document.querySelector("#course"),s=document.querySelector("#skills"),c=document.querySelector("#email"),a=document.querySelector("#isEnrolled"),d=()=>fetch("http://localhost:3000/students").then(t=>{if(!t.ok)throw Error(`Error ${t.statusText}`);return t.json()}).then(t=>{e.innerHTML=t.map(t=>`
        <tr data-id="${t.id}">
          <th>${t.id}</th>
          <th>${t.name}</th>
          <th>${t.age}</th>
          <th>${t.course}</th>
          <th>${t.skills.join(", ")}</th>
          <th>${t.email}</th>
          <th>${t.isEnrolled}</th>
          <th>
            <button class="delete-btn" data-id="${t.id}">
              Видалити
            </button>
          </th>
        </tr>
      `).join("")}).catch(t=>console.log(t));t.addEventListener("click",d),o.addEventListener("submit",t=>{t.preventDefault(),fetch("http://localhost:3000/students",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r.value,age:n.value,course:l.value,skills:s.value.split(","),email:c.value,isEnrolled:a.checked})}).then(t=>{if(!t.ok)throw Error(`Error ${t.statusText}`);return t.json()}).then(()=>{d()}).catch(t=>console.log(t))}),e.addEventListener("click",t=>{var e;t.target.classList.contains("delete-btn")&&(e=t.target.dataset.id,fetch(`http://localhost:3000/students/${e}`,{method:"DELETE"}).then(t=>{if(!t.ok)throw Error(`Error ${t.statusText}`);d()}).catch(t=>console.log(t)))});
//# sourceMappingURL=goit-js-hw-23.ff4aacff.js.map
