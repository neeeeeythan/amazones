"""
Phase 6: Split _global.scss into FLOCSS directory structure.
"""
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCSS_DIR = os.path.join(BASE_DIR, 'assets', 'scss')

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.readlines()

def write_file(path, lines):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print(f"  Created: {os.path.relpath(path, BASE_DIR)}")

def run():
    print("=" * 60)
    print("Phase 6: FLOCSS directory restructure")
    print("=" * 60)

    global_path = os.path.join(SCSS_DIR, '_global.scss')
    lines = read_file(global_path)
    total = len(lines)
    print(f"  _global.scss has {total} lines")

    # 1. Foundation: lines 1-66 (variables + base element styles)
    foundation_lines = lines[0:66]  # 0-indexed: 0-65
    write_file(
        os.path.join(SCSS_DIR, 'foundation', '_base.scss'),
        foundation_lines
    )

    # 2. Utility: lines 67-5289 (all u-* classes + responsive breakpoints)
    utility_lines = lines[66:5289]  # 0-indexed: 66-5288
    write_file(
        os.path.join(SCSS_DIR, 'utility', '_utility.scss'),
        utility_lines
    )

    # 3. Components: lines 5290-end (buttons, animations, shared components)
    component_lines = lines[5289:]  # 0-indexed: 5289 onwards
    write_file(
        os.path.join(SCSS_DIR, 'component', '_shared.scss'),
        component_lines
    )

    # 4. Move layout files
    for name in ['_header.scss', '_footer.scss']:
        src = os.path.join(SCSS_DIR, name)
        dst = os.path.join(SCSS_DIR, 'layout', name)
        if os.path.exists(src):
            content = read_file(src)
            write_file(dst, content)
            os.remove(src)
            print(f"  Moved: {name} -> layout/{name}")

    # 5. Move page files
    page_files = [
        '_top.scss', '_about.scss', '_admission.scss', '_column.scss',
        '_column-slag.scss', '_contact.scss', '_family.scss', '_faq.scss',
        '_information.scss', '_medical.scss', '_member.scss', '_payment.scss',
        '_personal.scss', '_point_redemption.scss', '_price.scss',
        '_protein.scss', '_reservation.scss', '_rules.scss', '_sitemap.scss',
        '_sportip.scss', '_storedetail.scss', '_storedetail-introduction.scss',
        '_storedetail-review.scss', '_storelist.scss', '_visitor.scss'
    ]
    for name in page_files:
        src = os.path.join(SCSS_DIR, name)
        dst = os.path.join(SCSS_DIR, 'page', name)
        if os.path.exists(src):
            content = read_file(src)
            write_file(dst, content)
            os.remove(src)
            print(f"  Moved: {name} -> page/{name}")

    # 6. Create plugins placeholder for Swiper overrides
    write_file(
        os.path.join(SCSS_DIR, 'plugins', '_swiper.scss'),
        [
            '/* Swiper.js overrides */\n',
            '.swiper {\n',
            '  width: 100%;\n',
            '}\n',
            '\n',
            '.swiper-button-prev,\n',
            '.swiper-button-next {\n',
            '  color: var(--base-lightBlue);\n',
            '}\n',
        ]
    )

    # 7. Remove old _global.scss
    os.remove(global_path)
    print(f"  Removed: _global.scss")

    # 8. Rewrite style.scss with FLOCSS imports
    style_content = """// ============================================
//  Amazones - FLOCSS Architecture
// ============================================

// Foundation (variables, base element styles)
@use "foundation/base";

// Utility (u-* classes)
@use "utility/utility";

// Layout
@use "layout/header";
@use "layout/footer";

// Component (shared components from global)
@use "component/shared";

// Plugins
@use "plugins/swiper";

// Page
@use "page/top";
@use "page/about";
@use "page/admission";
@use "page/column";
@use "page/column-slag";
@use "page/contact";
@use "page/family";
@use "page/faq";
@use "page/information";
@use "page/medical";
@use "page/member";
@use "page/payment";
@use "page/personal";
@use "page/point_redemption";
@use "page/price";
@use "page/protein";
@use "page/reservation";
@use "page/rules";
@use "page/sitemap";
@use "page/sportip";
@use "page/storedetail";
@use "page/storedetail-introduction";
@use "page/storedetail-review";
@use "page/storelist";
@use "page/visitor";
"""
    style_path = os.path.join(SCSS_DIR, 'style.scss')
    with open(style_path, 'w', encoding='utf-8') as f:
        f.write(style_content)
    print(f"  Updated: style.scss")

    print("\nPhase 6 complete!")

if __name__ == '__main__':
    run()
