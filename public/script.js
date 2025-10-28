document.getElementById('invitationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const bride = document.getElementById('bride').value;
  const groom = document.getElementById('groom').value;
  const date = document.getElementById('date').value;
  const photo = document.getElementById('photo').files[0];

  const formData = new FormData();
  formData.append('photo', photo);
  const res = await fetch('/upload', { method: 'POST', body: formData });
  const data = await res.json();

  document.getElementById('names').textContent = `${bride} & ${groom}`;
  document.getElementById('weddingDate').textContent = new Date(date).toDateString();
  document.getElementById('previewImage').src = `/uploads/${data.filename}`;

  const message = encodeURIComponent(`Undangan Pernikahan ${bride} & ${groom} pada ${new Date(date).toDateString()}`);
  document.getElementById('whatsappBtn').href = `https://wa.me/?text=${message}`;

  document.getElementById('preview').classList.remove('hidden');
});