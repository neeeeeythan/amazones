"""
Phase 2: Header, footer, and shared component class renames.
Renames across all SCSS, HTML, and JS files.
"""
import re
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Rename mapping: (old_class, new_class)
RENAMES = [
    # Header layout classes
    ('I-header', 'l-header'),
    ('I-header-wrapper', 'l-header__wrapper'),
    ('header-btn--reservation', 'l-header__btn--reservation'),  # before header-btn
    ('header-btn__content', 'l-header__btn-content'),
    ('header-btn__text', 'l-header__btn-text'),
    ('header-btn', 'l-header__btn'),
    ('header-text', 'l-header__text'),
    ('header-floating-menu', 'l-header__floating-menu'),
    ('floating-menu-content', 'l-header__floating-content'),
    ('floating-menu-close', 'l-header__floating-close'),
    ('floating-menu-btn', 'l-header__floating-btn'),
    ('nav-menu-popup__columns', 'c-nav-menu__columns'),
    ('nav-menu-popup__column', 'c-nav-menu__column'),
    ('nav-menu-popup__group', 'c-nav-menu__group'),
    ('nav-menu-popup__section', 'c-nav-menu__section'),
    ('nav-menu-popup__links', 'c-nav-menu__links'),
    ('nav-menu-popup__bottom-btns', 'c-nav-menu__bottom-btns'),
    ('nav-menu-popup__bottom-links', 'c-nav-menu__bottom-links'),
    ('nav-menu-popup__bottom', 'c-nav-menu__bottom'),
    ('nav-menu-popup', 'c-nav-menu'),
    ('mobile-header-overlay', 'l-header__mobile-overlay'),
    ('mobile-hamburger', 'l-header__hamburger'),
    ('scroll-down-text', 'l-header__scroll-down'),

    # Footer layout classes
    ('I-footer', 'l-footer'),
    ('footer-main-container', 'l-footer__container'),
    ('footer-brand-logo', 'l-footer__brand-logo'),
    ('footer-brand', 'l-footer__brand'),
    ('footer-top', 'l-footer__top'),
    ('footer-bottom', 'l-footer__bottom'),
    ('footer-nav-columns', 'l-footer__nav-columns'),
    ('footer-nav-section', 'l-footer__nav-section'),
    ('footer-nav-group', 'l-footer__nav-group'),
    ('footer-nav-list', 'l-footer__nav-list'),
    ('footer-page-link__arrow-sign', 'l-footer__page-link-arrow-sign'),
    ('footer-page-link__arrow-icon', 'l-footer__page-link-arrow-icon'),
    ('footer-page-link__sign-open', 'l-footer__page-link-sign-open'),
    ('footer-page-link__sign-close', 'l-footer__page-link-sign-close'),
    ('footer-page-link', 'l-footer__page-link'),
    ('footer-link-line', 'l-footer__link-line'),
    ('footer-cta-links', 'l-footer__cta-links'),
    ('footer-legal-links', 'l-footer__legal-links'),
    ('footer-icon-link', 'c-icon-link'),
    ('footer-blue-btn', 'c-btn--light-blue'),  # merge into c-btn
    ('footer-btn', 'c-btn--footer'),

    # Shared component renames
    ('section-header-wrapper', 'c-section-header'),
    ('section-header-text', 'c-section-header__title'),
    ('section-sub-text', 'c-section-header__subtitle'),
    ('btn-light-blue', 'c-btn--light-blue'),
    ('btn-green-wrapper', 'c-btn--green'),
]

# Sort by old class length (longest first) to prevent partial matches
RENAMES.sort(key=lambda x: len(x[0]), reverse=True)


def rename_in_html(content, old_class, new_class):
    def replacer(match):
        quote = match.group(1)
        classes = match.group(2)
        new_classes = re.sub(
            r'(?<![a-zA-Z0-9_-])' + re.escape(old_class) + r'(?![a-zA-Z0-9_-])',
            new_class, classes)
        return f'class={quote}{new_classes}{quote}'
    return re.sub(r'''class=([\"'])(.*?)\1''', replacer, content, flags=re.DOTALL)


def rename_in_scss(content, old_class, new_class):
    return re.sub(
        r'\.' + re.escape(old_class) + r'(?=[^a-zA-Z0-9_-]|$)',
        '.' + new_class, content)


def rename_in_js(content, old_class, new_class):
    """Replace class names in JS querySelector strings and classList operations."""
    # querySelector(".classname") or querySelectorAll(".classname")
    content = re.sub(
        r'(?<=["\'])\.(' + re.escape(old_class) + r')(?=["\s,#\[>\+~:])',
        '.' + new_class, content)
    # Direct string references in classList or other contexts
    content = re.sub(
        r'(?<=["\'])(' + re.escape(old_class) + r')(?=["\'])',
        new_class, content)
    return content


def get_files(ext, base=None):
    if base is None:
        base = BASE_DIR
    files = []
    for root, dirs, filenames in os.walk(base):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
        for f in filenames:
            if f.endswith(ext):
                files.append(os.path.join(root, f))
    return files


def run():
    print("=" * 60)
    print("Phase 2: Header, footer & shared component renames")
    print("=" * 60)
    print(f"Renaming {len(RENAMES)} class pairs")

    html_files = get_files('.html')
    scss_files = get_files('.scss', os.path.join(BASE_DIR, 'assets', 'scss'))
    js_files = get_files('.js', os.path.join(BASE_DIR, 'assets', 'js'))

    for label, files, rename_fn in [
        ('SCSS', scss_files, rename_in_scss),
        ('HTML', html_files, rename_in_html),
        ('JS', js_files, rename_in_js),
    ]:
        print(f"\nProcessing {len(files)} {label} files...")
        for filepath in files:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            original = content
            for old, new in RENAMES:
                content = rename_fn(content, old, new)
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"  Updated: {os.path.relpath(filepath, BASE_DIR)}")

    print("\nPhase 2 complete!")


if __name__ == '__main__':
    run()
