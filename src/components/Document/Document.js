import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { logger } from "../../logger";
import "./Document.styles.css";

export const Document = ({ onAnnotate }) => {
  const [selectedText, setSelectedText] = useState("");
  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setContextMenuPosition({
        x: rect.left,
        y: rect.top - 40,
      });

      setSelectedText(selectedText);
      setContextMenuActive(true);
    } else {
      setContextMenuActive(false);
    }
  };

  const handleAnnotateText = () => {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (selectedText.length === 0) {
      return;
    }

    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const span = document.createElement("span");
    span.style.backgroundColor = "#09A1AD";
    span.dataset.startOffset = startOffset;
    span.dataset.endOffset = endOffset;
    range.surroundContents(span);

    const annotation = {
      text: selectedText,
      start: startOffset,
      end: endOffset,
      timestamp: new Date(),
    };
    onAnnotate(annotation);
  };

  const handleSearch = () => {
    alert(`Searching for: "${selectedText}"`);
  };

  return (
    <div className="document" onMouseUp={handleMouseUp}>
      <Card>
        <CardContent>
          <h2 className="document-header">Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel
            ante sed nisl lacinia semper sit amet ut tortor. Ut porta dictum
            quam in blandit. Donec feugiat efficitur odio, in fringilla eros
            auctor sit amet. Proin sed nisi tristique turpis semper aliquet eu
            non mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec volutpat neque in rhoncus faucibus. In placerat faucibus
            libero eget pharetra. Vivamus egestas nibh nec sem rutrum maximus.
            Cras vel dui mattis, condimentum nulla id, rutrum massa. Cras
            pellentesque nisl eu tempor dignissim. Integer cursus suscipit
            molestie. Proin lacinia leo massa, et faucibus sem hendrerit a.
            Morbi varius erat aliquet felis fringilla pellentesque. Sed in
            ligula eu mi pellentesque iaculis in sed turpis.
          </p>
          <p>
            Sed ut finibus ex, ac feugiat libero. In feugiat quam consequat
            dignissim laoreet. Donec varius porttitor tempus. Aenean nisi quam,
            accumsan sit amet ultricies viverra, mollis ultricies nisi. Nulla
            tincidunt, felis vel accumsan maximus, libero nisl tempor felis, ut
            blandit tortor massa feugiat ante. In vulputate quam eget nulla
            mollis pretium et ut dolor. Ut enim erat, ultricies ac semper sed,
            ullamcorper in quam. Praesent tortor lorem, euismod ac metus non,
            pellentesque porta leo. Suspendisse non molestie arcu. Ut
            consectetur pharetra elit, quis venenatis sem pellentesque vitae.
            Curabitur luctus ipsum in ipsum pretium, ut sagittis nisi sodales.
            Morbi bibendum vel dui dignissim hendrerit. Nullam odio felis,
            rutrum vitae pretium suscipit, accumsan ac neque.
          </p>
          <p>
            Nunc tincidunt tortor libero, ac vehicula ante vulputate et. Nulla
            dolor neque, semper eu pretium id, maximus vel est. Mauris arcu
            ante, gravida ut feugiat ac, gravida mattis nunc. Fusce vehicula
            rutrum arcu, facilisis commodo nisl egestas sit amet. Vivamus mauris
            leo, semper vel auctor at, efficitur vel tellus. Duis vitae euismod
            velit. Vestibulum eros massa, pharetra ac commodo et, convallis eget
            felis. Sed vel nisi ante. Nulla viverra purus ut aliquet viverra.
            Nulla a elit nunc. Suspendisse urna lacus, aliquam nec maximus non,
            vulputate a justo. Maecenas in dolor eget arcu gravida ullamcorper
            vel in purus. In accumsan quam et auctor rhoncus.
          </p>
          <p>
            Nullam gravida diam accumsan rutrum tincidunt. Mauris ligula ipsum,
            porta vel tincidunt vel, aliquam sed purus. Cras dictum quam nisi,
            non sodales sem dignissim ac. Fusce laoreet elit odio, sollicitudin
            egestas urna scelerisque quis. Aliquam vitae erat felis. Nunc eu
            enim tempus, gravida metus sed, convallis metus. Fusce a tortor
            tortor. Suspendisse potenti. Ut non eros id eros fringilla lacinia
            nec ac leo. Praesent consectetur urna et erat aliquam semper.
            Pellentesque laoreet, sapien a tincidunt egestas, sapien dui laoreet
            metus, non congue purus purus sed quam. Mauris laoreet nulla quis
            vehicula eleifend.
          </p>
          <p>
            Morbi rutrum enim quis viverra rhoncus. Nunc et urna suscipit,
            ornare sapien ut, convallis tortor. Nulla condimentum arcu eu
            facilisis porta. Nulla elit nibh, malesuada quis dolor vel, lobortis
            fermentum elit. Phasellus fermentum iaculis eros, nec ullamcorper
            massa hendrerit in. Cras nisl diam, accumsan quis ullamcorper a,
            commodo lacinia lacus. In sed dolor molestie, ornare metus sed,
            maximus risus. Nunc vitae justo eget nisi porttitor imperdiet in et
            turpis. Duis nec turpis at lorem consequat sollicitudin sit amet sed
            diam. Aliquam a ex iaculis, consectetur ligula sit amet, dictum
            nunc. Aenean sit amet faucibus arcu. Pellentesque hendrerit felis
            magna, eget facilisis mauris pretium nec. Aenean egestas ornare
            luctus. Quisque sodales quis felis ac suscipit. Cras in elit eget
            lorem consequat elementum sagittis sed urna. Donec ut enim congue,
            hendrerit felis convallis, tempus nulla.
          </p>
        </CardContent>
      </Card>
      <ContextMenu
        active={contextMenuActive}
        position={contextMenuPosition}
        onAnnotate={handleAnnotateText}
        onSearch={handleSearch}
      />
    </div>
  );
};
