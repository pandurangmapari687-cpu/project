// Toggle the sidebar on small screens
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.getElementById('adminSidebar');
  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', function () {
    sidebar.classList.toggle('active');
  });
});
