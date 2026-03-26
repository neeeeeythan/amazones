"""
Amazones class rename script - Phase 1 (utility u- prefix)
Uses pattern matching to identify utility classes in _global.scss,
then renames them across all SCSS and HTML files.
"""
import re
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCSS_DIR = os.path.join(BASE_DIR, 'assets', 'scss')

# Patterns that identify utility classes (regex patterns for class names)
UTILITY_PATTERNS = [
    # Colors
    r'bg-[\w-]+',          # bg-white, bg-lightBlue, bg-base-black1, etc.
    r'text-black1', r'text-white', r'text-lightBlue', r'text-red',
    r'text-peach', r'text-brown', r'text-lightPink',
    r'text-underline', r'text-italic', r'text-decoration-none',
    r'text-left', r'text-center', r'text-right', r'text-justify',
    r'text-nowrap', r'text-vertical',

    # Font
    r'font-outfit', r'font-zen',
    r'fw-\d+',             # fw-100 through fw-900
    r'fs-\d+',             # fs-8 through fs-320

    # Line height
    r'lh-\d+(?:px)?',      # lh-100, lh-180, lh-14px, etc.
    r'lh-normal',

    # Letter spacing
    r'ls-\d+',             # ls-3 through ls-50

    # Display
    r'block', r'inline-block', r'inline', r'inline-flex', r'inline-grid', r'hidden',

    # Position
    r'static', r'sticky',
    r'top-0', r'right-0', r'bottom-0', r'left-0',

    # Border radius
    r'radius-\d+',

    # Z-index
    r'z-\d+',

    # Overflow
    r'overflow-hidden', r'overflow-auto', r'overflow-scroll',

    # Flexbox
    r'flex-row', r'flex-row-reverse', r'flex-col', r'flex-col-reverse',
    r'flex-wrap', r'flex-nowrap', r'flex-wrap-reverse',
    r'flex-1', r'flex-auto', r'flex-initial', r'flex-none',
    r'items-start', r'items-center', r'items-end', r'items-stretch', r'items-baseline',
    r'justify-start', r'justify-center', r'justify-end',
    r'justify-between', r'justify-around', r'justify-evenly',
    r'content-center', r'content-start', r'content-end',
    r'content-between', r'content-around', r'content-evenly',
    r'self-auto', r'self-start', r'self-center', r'self-end', r'self-stretch',

    # Gap
    r'gap-\d+(?:px)?',     # gap-0 through gap-150px

    # Grid
    r'grid-cols-\d+', r'grid-rows-\d+',
    r'place-items-center', r'place-content-center',

    # Vertical align
    r'align-top', r'align-middle', r'align-bottom', r'align-baseline',

    # Spacing - padding (all sides)
    r'p-\d+',              # p-0 through p-100
    r'pt-\d+', r'pr-\d+', r'pb-\d+', r'pl-\d+',
    r'px-\d+', r'py-\d+',

    # Spacing - margin
    r'mt-\d+', r'mr-\d+', r'mb-\d+', r'ml-\d+',
    r'mx-\d+', r'my-\d+',
    r'mx-auto', r'ml-auto', r'mr-auto', r'mt-auto', r'mb-auto', r'my-auto',
    r'-mt-\d+', r'-ml-\d+', r'-mr-\d+', r'-mb-\d+',  # negative margins

    # Width/Height
    r'w-full', r'w-auto', r'w-screen', r'w-fit',
    r'h-full', r'h-auto', r'h-screen', r'h-fit',
    r'min-w-\d+', r'min-h-\d+', r'max-w-full', r'max-h-full',

    # Cursor
    r'cursor-pointer', r'cursor-default', r'cursor-not-allowed',

    # Display responsive
    r'display-desk', r'display-sp',

    # Text transform
    r'uppercase', r'lowercase', r'capitalize', r'normal-case',

    # Whitespace
    r'whitespace-nowrap', r'whitespace-pre', r'whitespace-pre-line', r'whitespace-pre-wrap',
]

# Classes to NEVER rename (even if they match a pattern)
EXCLUDE_CLASSES = {
    'relative',   # Too generic, conflicts with CSS position value in non-class contexts - handle separately
    'absolute',   # Same
    'fixed',      # Same
    'flex',       # Same - 'flex' is both a display value and utility
    'grid',       # Same
}

# Classes that need special handling (rename these explicitly)
SPECIAL_RENAMES = {
    'relative': 'u-relative',
    'absolute': 'u-absolute',
    'fixed': 'u-fixed',
    'flex': 'u-flex',
    'grid': 'u-grid',
}


def extract_utility_classes(scss_path):
    """Extract utility class names from _global.scss using patterns."""
    with open(scss_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract all class definitions from the file
    all_classes = set(re.findall(r'^\.([\w-]+)\s*[{,]', content, re.MULTILINE))

    # Filter to only utility classes using our patterns
    utility_classes = set()
    for cls in all_classes:
        for pattern in UTILITY_PATTERNS:
            if re.fullmatch(pattern, cls):
                if cls not in EXCLUDE_CLASSES:
                    utility_classes.add(cls)
                break

    # Sort by length (longest first) to prevent partial matches
    result = sorted(utility_classes, key=len, reverse=True)
    return result


def rename_in_html(content, old_class, new_class):
    """Replace class name in HTML class attributes only."""
    def replacer(match):
        quote = match.group(1)
        classes = match.group(2)
        new_classes = re.sub(
            r'(?<![a-zA-Z0-9_-])' + re.escape(old_class) + r'(?![a-zA-Z0-9_-])',
            new_class,
            classes
        )
        return f'class={quote}{new_classes}{quote}'

    content = re.sub(r'''class=(["'])(.*?)\1''', replacer, content, flags=re.DOTALL)
    return content


def rename_in_scss(content, old_class, new_class):
    """Replace .old-class selector in SCSS."""
    content = re.sub(
        r'\.' + re.escape(old_class) + r'(?=[^a-zA-Z0-9_-]|$)',
        '.' + new_class,
        content
    )
    return content


def get_all_html_files():
    files = []
    for root, dirs, filenames in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
        for f in filenames:
            if f.endswith('.html'):
                files.append(os.path.join(root, f))
    return files


def get_all_scss_files():
    files = []
    for root, dirs, filenames in os.walk(SCSS_DIR):
        for f in filenames:
            if f.endswith('.scss'):
                files.append(os.path.join(root, f))
    return files


def phase1():
    print("=" * 60)
    print("Phase 1: Adding u- prefix to utility classes")
    print("=" * 60)

    global_scss = os.path.join(SCSS_DIR, '_global.scss')
    utility_classes = extract_utility_classes(global_scss)

    # Add the special classes
    all_renames = [(cls, f'u-{cls}') for cls in utility_classes]
    for old, new in SPECIAL_RENAMES.items():
        all_renames.append((old, new))

    # Re-sort by old class length (longest first)
    all_renames.sort(key=lambda x: len(x[0]), reverse=True)

    print(f"Found {len(all_renames)} utility classes to rename")
    # Show categorized counts
    categories = {}
    for old, new in all_renames:
        prefix = old.split('-')[0] if '-' in old else old
        categories[prefix] = categories.get(prefix, 0) + 1
    for cat, count in sorted(categories.items(), key=lambda x: -x[1])[:15]:
        print(f"  {cat}-*: {count}")

    html_files = get_all_html_files()
    scss_files = get_all_scss_files()

    # Process SCSS files
    print(f"\nProcessing {len(scss_files)} SCSS files...")
    scss_updated = 0
    for filepath in scss_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in all_renames:
            content = rename_in_scss(content, old, new)
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated: {os.path.relpath(filepath, BASE_DIR)}")
            scss_updated += 1

    # Process HTML files
    print(f"\nProcessing {len(html_files)} HTML files...")
    html_updated = 0
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        original = content
        for old, new in all_renames:
            content = rename_in_html(content, old, new)
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  Updated: {os.path.relpath(filepath, BASE_DIR)}")
            html_updated += 1

    print(f"\nPhase 1 complete! Updated {scss_updated} SCSS + {html_updated} HTML files.")


if __name__ == '__main__':
    phase1()
