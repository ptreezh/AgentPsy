// Debug version to check what's happening with the dropdown
console.log('Debug script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking dropdowns...');
    
    const dropdowns = document.querySelectorAll('.dropdown');
    console.log('Found dropdowns:', dropdowns.length);
    
    dropdowns.forEach((dropdown, index) => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && dropdownContent) {
            const menuLinks = dropdownContent.querySelectorAll('a');
            const hasValidMenuItems = menuLinks.length > 0;
            
            console.log(`Dropdown ${index}:`, {
                buttonText: dropbtn.textContent.trim(),
                href: dropbtn.getAttribute('href'),
                menuLinksCount: menuLinks.length,
                hasValidMenuItems: hasValidMenuItems,
                clickHandlerAdded: false, // 现在没有点击事件处理器了
                behavior: '正常跳转 - 不阻止默认行为'
            });
            
            // 测试点击是否真的跳转
            dropbtn.addEventListener('click', function(e) {
                console.log('点击事件触发:', {
                    text: this.textContent.trim(),
                    href: this.getAttribute('href'),
                    defaultPrevented: e.defaultPrevented,
                    willNavigate: !e.defaultPrevented
                });
            });
        }
    });
});