// 简化的下拉菜单测试脚本
console.log('=== 下拉菜单测试脚本加载 ===');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始测试下拉菜单...');
    
    const dropdowns = document.querySelectorAll('.dropdown');
    console.log('找到下拉菜单数量:', dropdowns.length);
    
    dropdowns.forEach((dropdown, index) => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropbtn && dropdownContent) {
            console.log(`\n--- 下拉菜单 ${index + 1} ---`);
            console.log('按钮文本:', dropbtn.textContent.trim());
            console.log('按钮href:', dropbtn.getAttribute('href'));
            console.log('内容元素存在:', !!dropdownContent);
            console.log('当前display样式:', window.getComputedStyle(dropdownContent).display);
            
            // 检查是否有链接
            const links = dropdownContent.querySelectorAll('a');
            console.log('链接数量:', links.length);
            
            // 添加简单的悬停测试
            dropdown.addEventListener('mouseenter', function() {
                console.log('鼠标进入:', dropbtn.textContent.trim());
                console.log('当前display:', window.getComputedStyle(dropdownContent).display);
                dropdownContent.classList.add('show');
                console.log('添加show类后display:', window.getComputedStyle(dropdownContent).display);
            });
            
            dropdown.addEventListener('mouseleave', function() {
                console.log('鼠标离开:', dropbtn.textContent.trim());
                dropdownContent.classList.remove('show');
            });
        }
    });
});